import { v4 } from "uuid";

import { IIamportSubscription } from "iamport-server-api/lib/structures/IIamportSubscription";

import { AdvancedRandomGenerator } from "../utils/AdvancedRandomGenerator";
import { FakeIamportStorage } from "./FakeIamportStorage";

export namespace FakeIamportSubscriptionProvider {
    export function store(
        customer_uid: string,
        input: IIamportSubscription.IStore,
    ): IIamportSubscription {
        const subscription: IIamportSubscription = {
            customer_uid,
            pg_provider: "pg-of-somewhere",
            pg_id: v4(),
            card_type: "card",
            card_code: v4(),
            card_name: AdvancedRandomGenerator.name(),
            card_number: input.card_number,
            customer_name: AdvancedRandomGenerator.name(),
            customer_tel: AdvancedRandomGenerator.mobile(),
            customer_addr: "address-of-somewhere",
            customer_email:
                AdvancedRandomGenerator.alphabets(8) + "@samchon.org",
            customer_postcode: "11122",
            inserted: 1,
            updated: 0,
        };
        FakeIamportStorage.subscriptions.set(customer_uid, subscription);

        return subscription;
    }
}
