const DESTINATION_ACCOUNT = '9keVSx1xT1ev8GWwJrsTjtFYPxKx7XxqumHY3RTAohtc';

import * as web3 from '@solana/web3.js';
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

        const connection = new web3.Connection(solanaEndpoint);
        const blockhash = await connection.getLatestBlockhash({ commitment: 'max' });
        const fromPubkey = new web3.PublicKey(account);
        const toPubkey = new web3.PublicKey(DESTINATION_ACCOUNT);

        const transferIx = web3.SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: Math.floor(web3.LAMPORTS_PER_SOL * parseFloat(amount)),
        })

        const message = new web3.TransactionMessage({
            payerKey: fromPubkey,
            recentBlockhash: blockhash.blockhash,
            instructions: [transferIx],
        }).compileToV0Message();

        const buf = new web3.VersionedTransaction(message).serialize();

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
                        label: 'Donate',
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