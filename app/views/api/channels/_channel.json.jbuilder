json.extract! channel, :id, :topic, :title, :purpose, :created_at
json.messageable_type "Channel"
json.user_ids do 
    json.array! channel.users.ids
end