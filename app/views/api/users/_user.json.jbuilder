json.extract! user, :id, :username, :email, :full_name
json.channel_ids do
     json.array! user.channels.ids
end
json.message_ids do
     json.array! user.messages.ids
end
