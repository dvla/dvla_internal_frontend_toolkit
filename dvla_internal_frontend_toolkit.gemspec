# coding: utf-8
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "dvla_internal_frontend_toolkit/version"

Gem::Specification.new do |spec|
  spec.name          = "dvla_internal_frontend_toolkit"
  spec.version       = DvlaInternalFrontendToolkit::VERSION
  spec.authors       = ["Liam Betsworth", "Lewis Campbell", "Driver and Vehicle Licencing Agency"]
  spec.email         = ["liam.betsworth@gofore.com"]

  spec.summary       = "DVLA Internal Frontend Toolkit"
  spec.description   = "A gem for https://github.com/liam-betsworth/dvla_internal_frontend_toolkit"
  spec.homepage      = "https://github.com/liam-betsworth/dvla_internal_frontend_toolkit"
  spec.license       = "MIT"

  spec.files         = Dir["lib/**/*"] + Dir["vendor/assets/{fonts, images,stylesheets}/**/*"] + Dir["vendor/assets/layouts/*.erb"] + ["LICENSE", "README.md"]
  # spec.files         = Dir["lib/**/*"] + Dir["vendor/fonts/*"] + Dir["vendor/images/*"] + Dir["vendor/stylesheets/*"] + Dir["vendor/layouts/*.erb"] + ["LICENSE", "README.md"]
  spec.bindir        = "exe"
  spec.require_paths = ["lib"]

  spec.add_dependency "railties", "~> 5.1"

  spec.add_development_dependency "bundler", "~> 1.15"
  spec.add_development_dependency "rake", "~> 10.0"
end
