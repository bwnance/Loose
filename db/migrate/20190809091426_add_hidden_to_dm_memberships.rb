class AddHiddenToDmMemberships < ActiveRecord::Migration[5.2]
  def change
    add_column :dm_memberships, :hidden, :boolean, null: false, default: false
  end
end
