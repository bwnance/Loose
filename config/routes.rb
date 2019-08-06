Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"
  mount ActionCable.server => '/cable'
  namespace :api, defaults: {format: :json} do
    
    resources :users, only: [:create, :index, :show]
    resource :session, only: [:create, :destroy]
    resources :channels, only: [:create, :destroy, :update, :index] do
      resources :messages, only: [:create, :index]
      get 'users', to: 'users#getAllUsersForChannel'
      post 'users', to: 'channels#addUsersToChannel'
    end
    resources :messages, only: [:update]
    get 'session/check_email', to: 'sessions#check_email' 
    get 'channels/getDefaultChannelId', to: 'channels#getDefaultChannelId' 
    get 'channels/currentUserChannels', to: 'channels#currentUserChannels'

  end
end
