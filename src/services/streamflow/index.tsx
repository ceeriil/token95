import {
  ICreateSolanaExt,
  SolanaStreamClient,
} from "@streamflow/stream/solana";
import {
  ICreateStreamData,
  StreamType,
  StreamDirection,
  ICreateResult,
  Stream,
} from "@streamflow/stream";

/**
 * create a new instance of the SolanaStreamClient
 */
const solanaClient = new SolanaStreamClient(
  `${process.env.NEXT_PUBLIC_RPC_URL}`
);

/**
 * Create a new stream on the Solana blockchain
 *
 * @async
 * @param {ICreateStreamData} streamParams
 * @param {ICreateSolanaExt} solanaParams
 * @param {(stream: ICreateResult) => void} onSuccess
 * @param {(error: unknown) => void} onError
 * @returns {Promise<ICreateResult | undefined>}
 */
export const createStream = async (
  streamParams: ICreateStreamData,
  solanaParams: ICreateSolanaExt,
  onSuccess: (stream: ICreateResult) => void,
  onError: (error: unknown) => void
): Promise<ICreateResult | undefined> => {
  try {
    const stream = await solanaClient.create(streamParams, solanaParams);
    if (stream) {
      onSuccess(stream);
    }
    return stream;
  } catch (error) {
    onError(error);
  }
};

/**
 * Get all streams from the Solana blockchain
 *
 * @async
 * @param {string} address
 * @returns {Promise<[string, Stream][] | undefined>}
 */
export const getAllStreams = async (
  address: string
): Promise<[string, Stream][] | undefined> => {
  try {
    const streams = await solanaClient.get({
      address,
      type: StreamType.All,
      direction: StreamDirection.All,
    });
    return streams;
  } catch (error) {
    console.error(error);
  }
};
