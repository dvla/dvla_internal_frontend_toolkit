# coding: utf-8
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "dvla_internal_elements/version"

Gem::Specification.new do |spec|
  spec.name          = "dvla_internal_elements"
  spec.version       = DvlaInternalElements::VERSION
  spec.authors       = ["Liam Betsworth", "Lewis Campbell", "Driver and Vehicle Licencing Agency"]
  spec.email         = ["liam.betsworth@gofore.com"]

  spec.summary       = "DVLA Internal Elements"
  spec.description   = "A gem for https://github.com/liam-betsworth/dvla_internal_elements"
  spec.homepage      = "https://github.com/liam-betsworth/dvla_internal_elements"
  spec.license       = "MIT"

  spec.files         = Dir["{lib,vendor}/**/*"] + ["LICENSE", "README.md"]
  spec.bindir        = "exe"
  spec.require_paths = ["lib"]

  spec.add_dependency "railties", "~> 5.1.4"

  spec.add_development_dependency "bundler", "~> 1.15"
  spec.add_development_dependency "rake", "~> 10.0"
end
