import mongoose, {model, Schema} from "mongoose";
import User from "./User";
import Track from "./Track";

const TrackHistorySchema = new Schema( {
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'User',
        validate: {
            validator: async (value:mongoose.Types.ObjectId) => await User.findById(value),
            message: 'There is no such user'
        }
    },
    track: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Track',
        validate: {
            validator: async (value:mongoose.Types.ObjectId) => await Track.findById(value),
            message: 'There is no such track'
        }
    },
    datetime: {
        type: String,
        required: true
    },
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);
export default TrackHistory;