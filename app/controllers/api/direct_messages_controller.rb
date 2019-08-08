class Api::DirectMessagesController < ApplicationController
    def current_user_dms
         #index only shows channels available to the current user.
        current_user_channel_ids = current_user.direct_messages.ids;
        @dms = DirectMessage.includes(:users).select {|dm| current_user_channel_ids.include?(dm.id)}
        render :index
    end
    def messages
        current_dm = DirectMessage.find_by(id: params[:id])
        if current_dm
            @messages = current_dm.messages
            render 'api/messages/index'
        end
    end
end