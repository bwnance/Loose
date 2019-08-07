# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  sender_id        :integer          not null
#  messageable_id   :integer          not null
#  messageable_type :string           not null
#  is_auto_message  :boolean          not null
#  parent_id        :integer
#  body             :text             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Message < ApplicationRecord
    validates :sender_id, :messageable_id, :messageable_type, :body, presence: true
    validates :body, length: { maximum: 4000 }
    
    belongs_to :user, foreign_key: :sender_id
    belongs_to :messageable, polymorphic: true
    after_initialize :default_values

    def default_values
        self.is_auto_message ||= false
    end
end
