# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all()
Channel.destroy_all()
Message.destroy_all()
DirectMessage.destroy_all()
demo = User.create(full_name: "Demo User", email: "demouser@loose.org", password:"demodemo", password_check: "demodemo")
general = Channel.new(title: "general", purpose: "General discussion!")
dm = DirectMessage.create()
dm.users << demo
general.id = 1;
general.save!
general.users << demo