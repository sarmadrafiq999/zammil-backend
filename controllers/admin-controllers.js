const Service = require("../models/Service-model")
const Contact = require("../models/Contact-model"); // Ensure this is imported
const User = require("../models/user-model")



// *------------------------
// creating new the services
// *------------------------
const postService = async (req, res, next) => {
    try {
        const { title, description, category, price, img } = req.body

        const addNew = new Service({
            title, description, category, price, img
        });
        await addNew.save();
        console.log("Received Image URL:", img);

        // await addNew.save()
        res.status(200).json({
            success: true,
            message: "Service stored successfully",
            data: addNew
        })
    } catch (error) {
        next(error)
    }
}
//------------------------------------
// Getting all services for the admin
//------------------------------------
const Getservices = async (req, res, next) => {
    try {
        const servicesForAdmin = await Service.find()
        if (!servicesForAdmin || servicesForAdmin.length === 0) {
            return res.status(404).json({ message: "No services found in the database." });
        }
        return res.status(200).json(servicesForAdmin)

    } catch (error) {
        next(error)
    }
}
//------------------------------------
// Getting Single services for the admin
//------------------------------------
const SingleService = async (req, res, next) => {
    try {
        const { id } = req.params
        const findedService = await Service.findById(id)
        if (!findedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(findedService);

    } catch (error) {
        next(error)
    }
}

// *------------------------
// Edit a Service
// *------------------------
const EditService = async (req, res, next) => {
    try {
        const idEdit = req.params.id;
        const update = req.body;

        const updatedService = await Service.findByIdAndUpdate(idEdit, update, {
            new: true,            // return the updated document
            runValidators: true,  // optional: run schema validators on update
        });

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        return res.status(200).json({
            message: "Service updated successfully",
            data: updatedService,
        });
    } catch (error) {
        next(error);
    }
};




// *------------------------
// DELETE a Service
// *------------------------
const DeleteService = async (req, res, next) => {
    try {
        const serviceID = req.params.id
        await Service.deleteOne({ _id: serviceID })

        return res.status(200).json({ message: "Service  deleted successfully" });

    } catch (error) {
        next(error)
    }

}
// *------------------------
// getting  the contacts
// *------------------------
const getContacts = async (req, res) => {
    try {
        const gettingContacts = await Contact.find()
        if (!gettingContacts || gettingContacts.length === 0) {
            return res.status(404).json({ message: "can't get the contacts from the DB" })
        }
        console.log("Getting contacts", gettingContacts);
        return res.status(200).json(gettingContacts)

    } catch (error) {
        next(error)
    }

}
// *------------------------
// DELETE the contacts
// *------------------------

const DeleteContacts = async (req, res) => {
    try {
        const userid = req.params.id;
        await Contact.deleteOne({ _id: userid });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error)
    }

};
// *------------------------
// UpDatecontcat the contcat
// *------------------------
const UpDateContact = async (req, res) => {
    try {
        const id = req.params.id
        const getContactData = req.body
        const updatedcontact = await Contact.updateOne({ _id: id }, {
            $set: getContactData,
        })
        return res.status(200).json(updatedcontact)
    } catch (error) {
        next(error)
    }
}
// Get single contact
const GetontactByID = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Contact.findById(id);  // ✅ Use the correct model here
        if (!data) {
            return res.status(404).json({ message: "Contact not found" });
        }
        console.log("This is the contact to be updated:", data);
        return res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// *------------------------
// Get All users
// *------------------------

const getAllUsers = async (req, res) => {
    try {
        const gettingUsers = await User.find({}, { password: 0 })
        if (!gettingUsers || gettingUsers.length === 0) {
            return res.status(404).json({ message: "can't get the user from the DB" })
        }
        console.log("Getting USer", gettingUsers);
        return res.status(200).json(gettingUsers)


    } catch (error) {
        next(error)
    }
}
// *------------------------
// UpDateuser the user
// *------------------------
const UpDateUser = async (req, res) => {
    try {
        const id = req.params.id
        const getuserData = req.body
        const updatedUser = await User.updateOne({ _id: id }, {
            $set: getuserData,
        })
        return res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}
// *------------------------
// getting the user
// *------------------------
const GetUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 })
        console.log("this is the data which has to be updated ", data);
        return res.status(200).json({ data })

    } catch (error) {
        next(error)
    }
}
// *------------------------
// DELETE the user
// *------------------------

const Deleteuser = async (req, res) => {
    try {
        const userid = req.params.id;
        await User.deleteOne({ _id: userid });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error)
    }

};


module.exports = { postService, DeleteService, Getservices, SingleService, EditService, getContacts, DeleteContacts, getAllUsers, UpDateUser, GetUserByID, Deleteuser, UpDateContact, GetontactByID }