# CommonEdge TypeScript APIs

This is a collection of client-side APIs for interacting with the CommonEdge
glass design models and services from TypeScript and JavaScript.

## General Notes

This library is intended to be imported by module. So rather than importing
something from the package as a whole:

```typescript
import { Opening } from '@commonedge/api'; // does not work
```

you must import from the module within the package:

```typescript
import { Opening } from '@commonedge/api/Silica/Opening'; // works!
```

This is partly as a simplistic form of tree shaking, but mostly to provide name
spacing as different generations provide similarly named models.

## Models

Each model comes with TypeScript type definitions and an encoder-decoder pair
to validate that a received model matches the type. There are also supplied
optics (using the `monocle-ts` library) to manipulate the model in an
pure/immutable fashion with maximum data sharing.

### Template

`Template` provides generic templating of an client-opaque model. The client
can manipulate the `Value` field of each `Option` and `Variable`, and the
server can then substitute in the variables and apply the options to the data
payload before sending them on to the appropriate service.

- Type/Codecs: complete.
- Optics: none.

### Silica/Opening

`Opening` is a model the walls, floor, and ceiling surrounding a single
opening, which is to be filled with panels of some material.

- Type/Codecs: complete.
- Optics: partial.

### Silica/Division

`Division` is typically used as part of the `Opening` model to describe how
each `Section` in an `Opening` should be split into panels. This library
provides types and validators for these structures, as well as optics to
manipulate them.

- Type/Codecs: mostly complete.
- Optics: partial.

## Services

### Requestor

`Requestor` abstracts the details of making a, probably authenticated, one-off
request of the server. Currently the only `Requestor` is in `Requestor/Glassd`
which requires an API token-secret pair.

### Subscriber

`Subscriber` abstracts the details of opening a, probably authenticated,
session with the server. *It is currently unimplemented in the client.*

### Silica/Calc

`Calc` requests calculations of the server. The client provides a set of
inputs, and the server responds with the requested outputs, or messages
describing what went wrong in producing those outputs.

### Silica/Opening/GetDrawings

`GetDrawings` requests SVG drawings of `Opening`s suitable for display to the
end user, with sufficient metadata to create an interactive client.
