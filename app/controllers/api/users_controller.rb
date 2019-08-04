class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            @user.channels << Channel.default
            login!(@user)
            render :show
        else
            @errors = @user.errors
            render 'api/errors/structured_errors', status: 422
        end
    end
    def show
        @user = User.includes(:channels, :messages).find(params[:id])
    end
    def getAllUsersForChannel
        @channel = Channel.includes(users: [:messages, :channels]).find(params[:channel_id])
        @users = @channel.users
        render :index
    end
    def index
        @users = User.all.includes(:channels, :messages)
        render :index
    end
    def user_params
        params.require(:user).permit(:username,:full_name, :email, :password, :password_check)
    end
end