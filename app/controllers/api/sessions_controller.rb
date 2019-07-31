class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(user_params[:username], user_params[:password])
        if @user
            render 'api/users/show'
        else
            @errors = ["Invalid email or password"]
            render 'api/errors/errors', status: 422
        end
    end
    def destroy
    end
    def user_params
        params.require(:user).permit(:username, :email, :password)
    end
end
