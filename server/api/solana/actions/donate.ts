import { ActionGetResponse, ActionPostResponse } from '@solana/actions';
import * as web3 from '@solana/web3.js';
import { addressSolana } from '~/composables/links';
import { encodeBase64 } from '~/utils/encode';

export default defineEventHandler(async (event) => {
    if (handleCors(event, {
        origin: '*',
        methods: '*',
        maxAge: '604800',
    })) {
        return;
    }

    const { amount } = getQuery(event);

    setResponseHeaders(event, {
        'X-Action-Version': '2.1.3',
        'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    })

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
        const toPubkey = new web3.PublicKey(addressSolana);

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
        } as ActionPostResponse
    } else {
        return {
            type: 'action',
            icon: 'https://yankeguo.com/favicon-512-v2.png',
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
        } as ActionGetResponse
    }
})