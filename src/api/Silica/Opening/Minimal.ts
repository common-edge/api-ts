/**
 * Fetch a minimal opening from Silica.
 *
 * @since 0.2.0
 */

import { Opening } from '~model/Silica/Opening';
import { Requestor } from '~api/Requestor';

/**
 * Fetch a minimal Opening from Silica.
 *
 * @since 0.2.0
 */
export const getMinimalOpening = (req: Requestor): Promise<Opening> =>
	req.request(Opening)('minimal/silica/opening', 'GET');
