/**
 * Client Facing Messages
 *
 * @since 0.4.0
 */
import { interface as iface, keyof, string, Type } from 'io-ts';

/**
 * Level of urgency for the message.
 *
 * @since 0.1.0
 */
export type MessageLevel = 'info' | 'warn' | 'error';
/**
 * Codec for `MessageLevel`.
 *
 * @since 0.1.0
 */
export const MessageLevel: Type<MessageLevel> = keyof({
	info: true,
	warn: true,
	error: true,
});

/**
 * A message, possibly to display, from the server.
 *
 * @since 0.4.0
 */
export interface Message {
	level: MessageLevel;
	text: string;
};
/**
 * Codec for `Message`.
 *
 * @since 0.4.0
 */
export const Message: Type<Message> = iface({
	level: MessageLevel,
	text: string,
});
