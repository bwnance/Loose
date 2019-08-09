class AddOwnerFlagToChannelMemberships < ActiveRecord::Migration[5.2]
  def change
    add_column :channel_memberships, :owner, :boolean, null: false, default: false
  end
end
