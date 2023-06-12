/**
 * @packageDocumentation
 * @module api.functional.receipts
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection, Primitive } from "@nestia/fetcher";
import typia from "typia";

import { NestiaSimulator } from "./../../utils/NestiaSimulator";
import type { IIamportResponse } from "./../../structures/IIamportResponse";
import type { IIamportReceipt } from "./../../structures/IIamportReceipt";

/**
 * 현금 영수증 조회하기.
 * 
 * @param imp_uid 귀속 결제의 {@link IIamportPayment.imp_uid}
 * @returns 현금 영수증 정보
 * 
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @controller FakeIamportReceiptsController.at()
 * @path GET /receipts/:imp_uid
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function at(
    connection: IConnection,
    imp_uid: string,
): Promise<at.Output> {
    return !!(connection.simulate ?? (connection as any).random)
        ? at.simulate(
              connection,
              imp_uid,
          )
        : Fetcher.fetch(
              connection,
              at.ENCRYPTED,
              at.METHOD,
              at.path(imp_uid),
          );
}
export namespace at {
    export type Output = Primitive<IIamportResponse<IIamportReceipt>>;

    export const METHOD = "GET" as const;
    export const PATH: string = "/receipts/:imp_uid";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (imp_uid: string): string => {
        return `/receipts/${encodeURIComponent(imp_uid ?? "null")}`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Output =>
        typia.random<Output>(g);
    export const simulate = async (
        connection: IConnection,
        imp_uid: string,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METHOD,
            host: connection.host,
            path: path(imp_uid)
        });
        assert.param("imp_uid")("string")(() => typia.assert(imp_uid));
        return random(
            typeof (connection.simulate ?? (connection as any).random) === 'object'
            && (connection.simulate ?? (connection as any).random) !== null
                ? (connection.simulate ?? (connection as any).random)
                : undefined
        );
    }
}

/**
 * 현금 영수증 발행하기.
 * 
 * @param imp_uid 귀속 결제의 {@link IIamportPayment.imp_uid}
 * @param input 현금 영수증 입력 정보
 * @returns 현금 영수증 정보
 * 
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @controller FakeIamportReceiptsController.store()
 * @path POST /receipts/:imp_uid
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function store(
    connection: IConnection,
    imp_uid: string,
    input: store.Input,
): Promise<store.Output> {
    return !!(connection.simulate ?? (connection as any).random)
        ? store.simulate(
              connection,
              imp_uid,
              input,
          )
        : Fetcher.fetch(
              connection,
              store.ENCRYPTED,
              store.METHOD,
              store.path(imp_uid),
              input,
          );
}
export namespace store {
    export type Input = Primitive<IIamportReceipt.IStore>;
    export type Output = Primitive<IIamportResponse<IIamportReceipt>>;

    export const METHOD = "POST" as const;
    export const PATH: string = "/receipts/:imp_uid";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (imp_uid: string): string => {
        return `/receipts/${encodeURIComponent(imp_uid ?? "null")}`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Output =>
        typia.random<Output>(g);
    export const simulate = async (
        connection: IConnection,
        imp_uid: string,
        input: store.Input,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METHOD,
            host: connection.host,
            path: path(imp_uid)
        });
        assert.param("imp_uid")("string")(() => typia.assert(imp_uid));
        assert.body(() => typia.assert(input));
        return random(
            typeof (connection.simulate ?? (connection as any).random) === 'object'
            && (connection.simulate ?? (connection as any).random) !== null
                ? (connection.simulate ?? (connection as any).random)
                : undefined
        );
    }
}

/**
 * 현금 영수증 취소하기.
 * 
 * @param imp_uid 귀속 결제의 {@link IIamportPayment.imp_uid}
 * @returns 취소된 현금 영수증 정보
 * 
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @controller FakeIamportReceiptsController.erase()
 * @path DELETE /receipts/:imp_uid
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function erase(
    connection: IConnection,
    imp_uid: string,
): Promise<erase.Output> {
    return !!(connection.simulate ?? (connection as any).random)
        ? erase.simulate(
              connection,
              imp_uid,
          )
        : Fetcher.fetch(
              connection,
              erase.ENCRYPTED,
              erase.METHOD,
              erase.path(imp_uid),
          );
}
export namespace erase {
    export type Output = Primitive<IIamportResponse<IIamportReceipt>>;

    export const METHOD = "DELETE" as const;
    export const PATH: string = "/receipts/:imp_uid";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (imp_uid: string): string => {
        return `/receipts/${encodeURIComponent(imp_uid ?? "null")}`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Output =>
        typia.random<Output>(g);
    export const simulate = async (
        connection: IConnection,
        imp_uid: string,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METHOD,
            host: connection.host,
            path: path(imp_uid)
        });
        assert.param("imp_uid")("string")(() => typia.assert(imp_uid));
        return random(
            typeof (connection.simulate ?? (connection as any).random) === 'object'
            && (connection.simulate ?? (connection as any).random) !== null
                ? (connection.simulate ?? (connection as any).random)
                : undefined
        );
    }
}