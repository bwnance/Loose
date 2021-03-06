# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  full_name       :string           not null
#

class User < ApplicationRecord
    include ApplicationHelper
    validates :email,:username, :session_token, presence: true, uniqueness: true
    validates :password_digest, :full_name, presence: true
    validates :password, length: { minimum: 6, allow_nil: true}
    validate :passwords_match
    validate :email_format
    attr_reader :password
    attr_accessor :password_check

    after_initialize :ensure_session_token
    
    has_many :channel_memberships, class_name: :ChannelMemberships

    has_many :channels, through: :channel_memberships
    has_many :messages, foreign_key: :sender_id
    has_many :dm_memberships, class_name: :DMMembership
    has_many :direct_messages, through: :dm_memberships



    def initialize(params)
        email = params[:email]
        params[:username] ||= email && email.split("@")[0]
        super(params)
    end
    def self.generate_session_token
        return SecureRandom.urlsafe_base64
    end
    def self.find_by_credentials(id, password) #id is email or password
        user = User.find_by(email: id)
        user = User.find_by(username: id) unless user 
        return user if user && user.is_password?(password)
        
    end
    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end
    def is_password?(pass)
        ourPass = BCrypt::Password.new(self.password_digest)
        return ourPass.is_password?(pass)
    end
    def password=(val)
        
        @password = val
        hashedPass = BCrypt::Password.create(@password)

        self.password_digest = hashedPass
    end
    def reset_session_token!
        self.session_token = self.class.generate_session_token
        self.save
        self.session_token
    end
    def passwords_match
        if self.password != self.password_check
            errors.add(:passwords, "must match!")
        end
    end
    def email_format    #regex for email validity. matches any character n times, then an @ symbol, then any number of al
        unless is_email?(email)
            errors.add(:email, "must be a valid email")
        end
    end
end
