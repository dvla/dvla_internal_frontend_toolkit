require "dvla_internal_frontend_toolkit/version"

module DvlaInternalFrontendToolkit
  class Engine < ::Rails::Engine

    config.to_prepare do
      Rails.application.config.assets.precompile += %w(
        *.png
        *.jpg
        *.jpeg
        *.gif
        *.svg
        *.woff
      )
    end
    
  end
end
