class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            @errors = @user.errors.full_messages
            render 'api/errors/errors', status: 422
        end
    end
    def show
        @user = User.find(params[:id])
    end
    def index
        @users = User.all
        render :index
    end
    def user_params
        params.require(:user).permit(:username, :email, :password, :password_check)
    end
end