class CreateChannelMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :channel_memberships do |t|
      t.integer :user_id, null: false
      t.integer :channel_id, null: false

      t.index :user_id
      t.index :channel_id

      t.timestamps
    end
  end
end
