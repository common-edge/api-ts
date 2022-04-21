/**
 * Templates for simplified interaction with any model.
 *
 * @since 0.1.0
 */
import * as t from 'io-ts';
import { Option } from './Template/Option';
import { Variable } from './Template/Variable';

/**
 *  A template for simplified interaction with any model.
 *
 * - `Data` holds the templated model - the client doesn't need to interact with it at all.
 *
 * - `Opts` holds options that can be updated by the client, these are enumerated (suitable
 *   for a select field or similar) options where each option has custom presentation.
 *
 * - 'Vars' holds numeric variables, these are real numeric values either taken from a range
 *   (sutiable for an number input element or similar) or a enumerated list. Prime examples
 *   are measurements.
 *
 * @since 0.1.0
 */
export type Template = {
	Data: unknown,
	Opts: Option<string,string>[],
	Vars: Variable<string>[],
};
/**
 * Codec for `Template`.
 *
 * @since 0.1.0
 */
export const Template: t.Type<Template> = t.interface({
	Data: t.unknown,
	Opts: t.array(Option(t.string, t.string)),
	Vars: t.array(Variable(t.string)),
});
