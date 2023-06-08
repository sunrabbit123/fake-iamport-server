/**
 * @packageDocumentation
 * @module api.functional.certifications.otp
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection, Primitive } from "@nestia/fetcher";
import typia from "typia";

import { NestiaSimulator } from "./../../../utils/NestiaSimulator";
import type { IIamportCertification } from "./../../../structures/IIamportCertification";
import type { IIamportResponse } from "./../../../structures/IIamportResponse";

/**
 * 본인인증 요청하기.
 * 
 * `certifications.otp.request` 는 아임포트 서버에 본인인증을 요청하는 API 함수이다.
 * 이 API 를 호출하면 본인인증 대상자의 핸드폰으로 OTP 문자가 전송되며, 본인인증
 * 대상자가 {@link certifications.otp.confirm} 을 통하여 이 OTP 번호를 정확히
 * 입력함으로써, 본인인증이 완결된다.
 * 
 * 또한 본인인증 대상자가 자신의 핸드폰으로 전송된 OTP 문자를 입력하기 전에도,
 * 여전히해당 본인인증 내역은 {@link certifications.at} 함수를 통하여 조회할 수 있다.
 * 다만, 이 때 리턴되는 {@link IIamportCertification} 에서 인증의 완결 여부를
 * 지칭하는 {@link IIamportCertification.certified} 값은 `false` 이다.
 * 
 * @param input 본인인증 요청 정보
 * @returns 진행 중인 본인인증의 식별자 정보
 * 
 * @controller FakeIamportCertificationsController.request()
 * @path POST /certifications/otp/request
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function request(
    connection: IConnection,
    input: request.Input,
): Promise<request.Output> {
    return !!connection.random
        ? request.simulate(
              connection,
              input,
          )
        : Fetcher.fetch(
              connection,
              request.ENCRYPTED,
              request.METHOD,
              request.path(),
              input,
          );
}
export namespace request {
    export type Input = Primitive<IIamportCertification.IStore>;
    export type Output = Primitive<IIamportResponse<IIamportCertification.IAccessor>>;

    export const METHOD = "POST" as const;
    export const PATH: string = "/certifications/otp/request";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (): string => {
        return `/certifications/otp/request`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Output =>
        typia.random<Output>(g);
    export const simulate = async (
        connection: IConnection,
        input: request.Input,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METHOD,
            host: connection.host,
            path: path()
        });
        assert.body(() => typia.assert(input));
        return typia.random<Output>(
            typeof connection.random === 'object'
            && connection.random !== null
                ? connection.random
                : undefined
        );
    }
}

/**
 * 본인인증 시 발급된 OTP 코드 입력하기.
 * 
 * `certifications.otp.confirm` 는 {@link certifications.otp.request} 를 통하여
 * 발급된 본인인증 건에 대하여, 본인인증 대상자의 휴대폰으로 전송된 OTP 번호를
 * 검증하고, 입력한 OTP 번호가 맞거든 해당 본인인증 건을 승인하여 완료 처리해주는
 * API 함수이다.
 * 
 * 이처럼 본인인증을 완료하거든, 해당 본인인증 건 {@link IIamportCertification} 의
 * {@link IIamportCertification.certified} 값이 비로소 `true` 로 변경되어,
 * 비로소 완결된다.
 * 
 * @param imp_uid 대상 본인인증 정보의 {@link IIamportCertification.imp_uid}
 * @param input OTP 코드
 * @returns 인증 완료된 본인인증 정보
 * 
 * @controller FakeIamportCertificationsController.confirm()
 * @path POST /certifications/otp/confirm/:imp_uid
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function confirm(
    connection: IConnection,
    imp_uid: string,
    input: confirm.Input,
): Promise<confirm.Output> {
    return !!connection.random
        ? confirm.simulate(
              connection,
              imp_uid,
              input,
          )
        : Fetcher.fetch(
              connection,
              confirm.ENCRYPTED,
              confirm.METHOD,
              confirm.path(imp_uid),
              input,
          );
}
export namespace confirm {
    export type Input = Primitive<IIamportCertification.IConfirm>;
    export type Output = Primitive<IIamportResponse<IIamportCertification>>;

    export const METHOD = "POST" as const;
    export const PATH: string = "/certifications/otp/confirm/:imp_uid";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (imp_uid: string): string => {
        return `/certifications/otp/confirm/${encodeURIComponent(imp_uid ?? "null")}`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Output =>
        typia.random<Output>(g);
    export const simulate = async (
        connection: IConnection,
        imp_uid: string,
        input: confirm.Input,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METHOD,
            host: connection.host,
            path: path(imp_uid)
        });
        assert.param("imp_uid")("string")(() => typia.assert(imp_uid));
        assert.body(() => typia.assert(input));
        return typia.random<Output>(
            typeof connection.random === 'object'
            && connection.random !== null
                ? connection.random
                : undefined
        );
    }
}