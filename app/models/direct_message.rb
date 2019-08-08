# == Schema Information
#
# Table name: direct_messages
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DirectMessage < ApplicationRecord
    # belongs_to :user
    has_many :messages, as: :messageable
    has_many :dm_memberships,  class_name: :DMMembership, foreign_key: :dm_id
    has_many :users, through: :dm_memberships
    # before_validation :init_title
    # def init_title
    #     return if title    
    #     # debugger
    #     title = "";
    #     self.users.each do |user|
    #         title << "#{user.full_name}, "
    #     end
    #     self.title = title[0...-2];
    # end
end
