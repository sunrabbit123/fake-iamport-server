import TSON from "typescript-json";
import { v4 } from "uuid";

import imp from "../../../api";
import { IIamportCardPayment } from "../../../api/structures/IIamportCardPayment";
import { IIamportPayment } from "../../../api/structures/IIamportPayment";
import { IIamportResponse } from "../../../api/structures/IIamportResponse";

import { FakeIamportStorage } from "../../../providers/FakeIamportStorage";
import { RandomGenerator } from "../../../utils/RandomGenerator";

export async function test_fake_subscription_payment_again(
    connector: imp.IamportConnector,
): Promise<IIamportCardPayment> {
    /**
     * 간편 결제 카드 등록을 위한 고객 식별자 키.
     *
     * 이는 전적으로 아임포트를 사용하는 서비스에서 발급하여 관리하며,
     * 아임포트는 이를 고객 식별자 키라고 이름 지었지만,
     * 실제 역할은 간편 결제로 등록한 카드 식별자 키로써 역할한다.
     */
    const customer_uid: string = v4();

    /**
     * 간편 결제 카드 등록하기.
     *
     * 아임포트에 고객의 카드를 간편 결제 카드로써 등록하면, 매번 결제시마다
     * 카드 정보를 반복 입력하는 일 없이, `customer_uid` 만을 사용하여 매우
     * 간단하게 결제할 수 있다.
     */
    await imp.functional.subscribe.customers.store(
        await connector.get(),
        customer_uid,
        {
            customer_uid,
            card_number: RandomGenerator.cardNumber(),
            expiry: "2028-12",
            birth: "880311",
        },
    );

    /**
     * 간편 결제 카드로 결제하기.
     *
     * `customer_uid` 만으로 간편하게 결제할 수 있다.
     */
    const output: IIamportResponse<IIamportCardPayment> =
        await imp.functional.subscribe.payments.again(await connector.get(), {
            customer_uid,
            merchant_uid: v4(),
            amount: 10_000,
            name: "Fake 주문",
        });
    TSON.assert(output);

    /**
     * 아임포트 서버로부터의 웹훅 데이터.
     *
     * 다만 이 때 보내주는 정보는 최소한의 식별자 및 상태값 정보로써, 해당 결제 건에
     * 대하여 자세히 알고 싶다면, {@link payments.at} API 함수를 호출해야 한다.
     */
    const webhook: IIamportPayment.IWebhook =
        FakeIamportStorage.webhooks.back();
    if (webhook.imp_uid !== output.response.imp_uid)
        throw new Error(
            "Bug on subscribe.payments.onetime(): failed to deliver the webhook event.",
        );
    else if (webhook.status !== "paid")
        throw new Error(
            "Bug on subscribe.payments.onetime(): its status must be paid.",
        );

    /**
     * 결제 내역 조회하기.
     *
     * 위에서 발행한 간편 카드 결제 내역 및 웹훅 이벤트 데이터를 토대로, 아임포트
     * 서버로부터 {@link payments.at} API 함수를 호출하여 재 조회해보면, 카드 결제가
     * 무사히 완료되었음을, 그리고 관련 결제 정보 {@link IIamportCardPayment} 정보가
     * 완전하게 구성되었음을 알 수 있다.
     */
    const reloaded: IIamportResponse<IIamportPayment> =
        await imp.functional.payments.at(
            await connector.get(),
            webhook.imp_uid,
        );
    TSON.assert(reloaded);

    // 결제 방식 및 완료 여부 확인
    const payment: IIamportPayment = reloaded.response;
    if (payment.pay_method !== "card")
        throw new Error("Bug on payments.at(): its pay_method must be card.");
    else if (!payment.paid_at || payment.status !== "paid")
        throw new Error("Bug on payments.at(): its status must be paid.");

    // 첫 번째 if condition 에 의해 자동 다운 캐스팅 된 상태
    payment.card_number;
    return payment;
}
