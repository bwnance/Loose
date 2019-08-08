# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  purpose    :string
#  topic      :text
#

class Channel < ApplicationRecord
    validates :title, presence: true, length: { maximum: 22 }
    has_many :messages, as: :messageable
    has_many :channel_memberships,  class_name: :ChannelMemberships
    has_many :users, through: :channel_memberships
    
    def self.default
        Channel.find_by(id: 1)
    end
end
