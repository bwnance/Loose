title = dm.users.map { |user| user.full_name if user.id != current_user.id }.compact().join(", ")
title = current_user.full_name if title == ""
json.extract! dm, :id, :created_at
json.messageable_type "DirectMessage"
json.title title
json.user_ids do 
    json.array! dm.users.ids
end