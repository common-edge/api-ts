{ pkgs ? import ./nixpkgs { }
, nodePackages ? pkgs.nodePackages
}:

pkgs.stdenv.mkDerivation rec {
  name = "silica-ts";
  buildInputs = [
    nodePackages.typescript
    pkgs.nodejs-16_x
  ];
}
