/**
 * @packageDocumentation
 * @module api.functional.vbanks
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher, Primitive } from "@nestia/fetcher";
import type { IConnection } from "@nestia/fetcher";

import type { IIamportVBankPayment } from "./../../structures/IIamportVBankPayment";
import type { IIamportResponse } from "./../../structures/IIamportResponse";

/**
 * 가상 계좌 발급하기.
 * 
 * @param input 가상 계좌 입력 정보
 * @returns 가상 계좌 결제 정보
 * 
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @controller FakeIamportVbanksController.store()
 * @path POST /vbanks
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function store
    (
        connection: IConnection,
        input: Primitive<store.Input>
    ): Promise<store.Output>
{
    return Fetcher.fetch
    (
        connection,
        store.ENCRYPTED,
        store.METHOD,
        store.path(),
        input
    );
}
export namespace store
{
    export type Input = Primitive<IIamportVBankPayment.IStore>;
    export type Output = Primitive<IIamportResponse<IIamportVBankPayment>>;

    export const METHOD = "POST" as const;
    export const PATH: string = "/vbanks";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/vbanks`;
    }
}

/**
 * 가상 계좌 편집하기.
 * 
 * @param input 가상 계좌 편집 입력 정보
 * @returns 편집된 가상 계좌 결제 정보
 * 
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @controller FakeIamportVbanksController.update()
 * @path PUT /vbanks
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function update
    (
        connection: IConnection,
        input: Primitive<update.Input>
    ): Promise<update.Output>
{
    return Fetcher.fetch
    (
        connection,
        update.ENCRYPTED,
        update.METHOD,
        update.path(),
        input
    );
}
export namespace update
{
    export type Input = Primitive<IIamportVBankPayment.IUpdate>;
    export type Output = Primitive<IIamportResponse<IIamportVBankPayment>>;

    export const METHOD = "PUT" as const;
    export const PATH: string = "/vbanks";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/vbanks`;
    }
}