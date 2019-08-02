# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord
    validates :title, presence: true
    has_many :messages, as: :messageable
    has_many :channel_memberships,  class_name: :ChannelMemberships
    has_many :users, through: :channel_memberships
end
