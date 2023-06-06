/**
 * @packageDocumentation
 * @module api.functional.payments
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection, Primitive } from "@nestia/fetcher";
import typia from "typia";

import type { IIamportResponse } from "./../../structures/IIamportResponse";
import type { IIamportPayment } from "./../../structures/IIamportPayment";
import type { IIamportPaymentCancel } from "./../../structures/IIamportPaymentCancel";

/**
 * 결제 기록 열람하기.
 * 
 * 아임포트를 통하여 발생한 결제 기록을 열람한다.
 * 
 * @param imp_uid 대상 결제 기록의 {@link IIamportPayment.imp_uid}
 * @returns 결제 정보
 * 
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @controller FakeIamportPaymentsController.at()
 * @path GET /payments/:imp_uid
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function at(
    connection: IConnection,
    imp_uid: string,
): Promise<at.Output> {
    return !!connection.random
        ? at.random(
              typeof connection.random === "object" &&
                  connection.random !== null
                  ? connection.random
                  : undefined
          )
        : Fetcher.fetch(
              connection,
              at.ENCRYPTED,
              at.METHOD,
              at.path(imp_uid),
          );
}
export namespace at {
    export type Output = Primitive<IIamportResponse<IIamportPayment>>;

    export const METHOD = "GET" as const;
    export const PATH: string = "/payments/:imp_uid";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (imp_uid: string): string => {
        return `/payments/${encodeURIComponent(imp_uid ?? "null")}`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Output =>
        typia.random<Output>(g);
}

/**
 * 결제 취소하기.
 * 
 * 만약 가상 계좌를 통한 결제였다면, 반드시 환불 계좌 정보를 입력해줘야 한다.
 * 
 * @param input 결제 취소 입력 정보
 * @returns 취소된 결제 정보
 * 
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @controller FakeIamportPaymentsController.cancel()
 * @path POST /payments/cancel
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function cancel(
    connection: IConnection,
    input: Primitive<cancel.Input>,
): Promise<cancel.Output> {
    return !!connection.random
        ? cancel.random(
              typeof connection.random === "object" &&
                  connection.random !== null
                  ? connection.random
                  : undefined
          )
        : Fetcher.fetch(
              connection,
              cancel.ENCRYPTED,
              cancel.METHOD,
              cancel.path(),
              input,
          );
}
export namespace cancel {
    export type Input = Primitive<IIamportPaymentCancel.IStore>;
    export type Output = Primitive<IIamportResponse<IIamportPayment>>;

    export const METHOD = "POST" as const;
    export const PATH: string = "/payments/cancel";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (): string => {
        return `/payments/cancel`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Output =>
        typia.random<Output>(g);
}