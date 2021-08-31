{ system ? builtins.currentSystem }:
let nixpkgs = import (builtins.fetchTarball {
      name = "nixpkgs-21.05-2021-08-10";
      url = "https://github.com/NixOS/nixpkgs/archive/2d6ab6c6b92f7aaf8bc53baba9754b9bfdce56f2.tar.gz";
      sha256 = "1aafqly1mcqxh0r15mrlsrs4znldhm7cizsmfp3d25lqssay6gjd";
    });
    config = {
      packageOverrides = pkgs: rec {
      };
    };
 in nixpkgs { inherit config; inherit system; }
