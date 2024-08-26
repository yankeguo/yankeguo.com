const DESTINATION_ACCOUNT = '9keVSx1xT1ev8GWwJrsTjtFYPxKx7XxqumHY3RTAohtc';

import * as web3 from '@solana/web3.js';
import { getTransferSolInstruction } from '@solana-program/system';
import { encodeBase64 } from '~/utils/encode';

export default defineEventHandler(async (event) => {
    if (handleCors(event, {
        origin: '*',
        methods: ['GET', 'POST'],
    })) {
        return;
    }

    const { amount } = getQuery(event);

    if (event.method === 'POST') {
        if (typeof amount !== 'string' || !amount) {
            setResponseStatus(event, 400);
            return {
                error: 'Amount is required',
            }
        }
        const { account } = await readBody(event);
        if (!account) {
            setResponseStatus(event, 400);
            return {
                error: 'Account is required',
            }
        }

        const { solanaEndpoint } = useRuntimeConfig();
        const rpc = web3.createSolanaRpc(solanaEndpoint);
        const { value: latestBlockhash } = await rpc.getLatestBlockhash().send()

        const accountSource = web3.address(account)
        const accountDestination = web3.address(DESTINATION_ACCOUNT);

        const transaction = web3.pipe(
            web3.createTransactionMessage({ version: 0 }),
            tx => web3.setTransactionMessageFeePayer(accountSource, tx),
            tx => web3.setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
            tx => web3.appendTransactionMessageInstructions([
                getTransferSolInstruction({
                    source: accountSource, destination: accountDestination,
                    amount: BigInt(Math.floor(Number(amount)) * 1_000_000),
                })
            ], tx)
        )

        const buf = web3.getCompiledTransactionMessageEncoder().encode(web3.compileTransactionMessage(transaction))

        return {
            transaction: encodeBase64(buf),
        }
    } else {
        return {
            type: 'action',
            icon: 'https://yankeguo.com/favicon-512-v1.png',
            title: 'Donate',
            description: 'Donate to support Yanke G.',
            label: 'Donate',
            links: {
                actions: [
                    {
                        label: 'Donate 1 SOL',
                        href: '/api/solana/actions/donate?amount=1',
                    },
                    {
                        label: 'Donate 0.1 SOL',
                        href: '/api/solana/actions/donate?amount=0.1',
                    },
                    {
                        label: 'Donate 0.01 SOL',
                        href: '/api/solana/actions/donate?amount=0.1',
                    },
                    {
                        label: 'Donate Custom Amount',
                        href: '/api/solana/actions/donate?amount={amount}',
                        parameters: [
                            {
                                type: 'number',
                                name: 'amount',
                                label: 'Amount',
                                required: true,
                                min: 0.01,
                            }
                        ]
                    }
                ]
            }
        }
    }
})