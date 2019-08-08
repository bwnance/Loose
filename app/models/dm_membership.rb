# == Schema Information
#
# Table name: dm_memberships
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  dm_id      :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DMMembership < ApplicationRecord
    validates :dm_id, :user_id, presence: true
    belongs_to :user
    belongs_to :direct_message, foreign_key: :dm_id
end
