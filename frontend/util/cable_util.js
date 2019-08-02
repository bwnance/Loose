import ActionCable from 'actioncable'
export const createActionCable = ( 
    ActionCable.createConsumer("ws://localhost:3000")
)