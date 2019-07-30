class StaticPagesController < ApplicationController
    def root
        render 'static_pages/root'
    end
end