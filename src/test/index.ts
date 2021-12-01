import { IamportConnector } from "../api/IamportConnector";
import { Backend } from "../Backend";
import { Configuration } from "../Configuration";

import { DynamicImportIterator } from "./internal/DynamicImportIterator";

async function main(): Promise<void>
{
    // BACKEND SERVER
    const backend: Backend = new Backend();
    await backend.open();

    // PARAMETER
    const connector: IamportConnector = new IamportConnector
    (
        `http://127.0.0.1:${Configuration.API_PORT}`,
        { 
            imp_key: "test_imp_key", 
            imp_secret: "test_imp_secret" 
        }
    )

    // DO TEST
    const exceptions: Error[] = await DynamicImportIterator.force
    (
        __dirname + "/features", 
        {
            prefix: "test", 
            parameters: [ connector ]
        }
    );

    // TERMINATE
    await backend.close();

    if (exceptions.length === 0)
        console.log("Success");
    else
    {
        for (const exp of exceptions)
            console.log(exp);
        process.exit(-1);
    }
}
main().catch(exp =>
{
    console.log(exp);
    process.exit(-1);
});