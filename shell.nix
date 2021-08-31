{ pkgs ? import ./nixpkgs { }
, nodePackages ? pkgs.nodePackages
}:

pkgs.stdenv.mkDerivation rec {
  name = "silica-ts";
  buildInputs = [
    # nodePackages."@types/node"
    # nodePackages.ts-node
    nodePackages.typescript
    pkgs.nodejs-12_x
  ];
  shellHook = ''
    node tsconfig.js
  '';
}
