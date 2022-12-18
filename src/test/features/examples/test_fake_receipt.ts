import imp from "../../../api";
import { IIamportPayment } from "../../../api/structures/IIamportPayment";
import { IIamportReceipt } from "../../../api/structures/IIamportReceipt";
import { IIamportResponse } from "../../../api/structures/IIamportResponse";
import { test_fake_card_payment } from "./test_fake_card_payment";
import typia from "typia";

export async function test_fake_receipt(
    connector: imp.IamportConnector,
): Promise<void> {
    const payment: IIamportPayment = await test_fake_card_payment(connector);
    const output: IIamportResponse<IIamportReceipt> =
        await imp.functional.receipts.store(
            await connector.get(),
            payment.imp_uid,
            {
                imp_uid: payment.imp_uid,
                identifier: "8803111******",
                identifier_type: "person",
                buyer_name: "남정호",
                buyer_tel: "010********",
            },
        );
    typia.assertType(output);
    if (output.response.amount !== payment.amount)
        throw new Error("Bug on receipts.store(): different amount.");

    const reloaded: IIamportResponse<IIamportPayment> =
        await imp.functional.payments.at(
            await connector.get(),
            payment.imp_uid,
        );
    typia.assertType(reloaded);
    if (reloaded.response.cash_receipt_issue === false)
        throw new Error("Bug on receipts.store(): payment doesn't know.");
}
