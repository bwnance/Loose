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
        @user = User.find(params[:id])
    end
    def index
        @users = User.all
        render :index
    end
    def user_params
        params.require(:user).permit(:username,:full_name, :email, :password, :password_check)
    end
end