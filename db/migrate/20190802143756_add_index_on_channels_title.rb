class AddIndexOnChannelsTitle < ActiveRecord::Migration[5.2]
  def change
    add_index :channels, :title
  end
end
