const prisma = require('../../prismaClient');


// Create Parcel
const createParcel = async (parcelData) => {
  try {
    const { 
      item_name, 
      category, 
      quantity, 
      weight, 
      description, 
      user_id, 
      height, 
      width, 
      length 
    } = parcelData;


    console.log({
      data: {
        item_name,
        category,
        quantity,
        weight,
        width,
        length,
        height,
        description,
        user_id,
      },
    })

    const newParcel = await prisma.parcel.create({
      data: {
        item_name,
        category,
        quantity,
        weight,
        width,
        length,
        height,
        description,
        user_id,
      },
    });

    return { message: 'Parcel created successfully', parcel: newParcel };
  } catch (error) {
    throw new Error('Failed to create parcel: ' + error.message);
  }
};


//Get All Parcels
const getAllParcels = async () => {
  try {
    return await prisma.parcel.findMany();
  } catch (error) {
    throw new Error('Failed to get all parcels');
  }
};

//Get Parcel By ID
const getParcelById = async (id) => {
  try {
    const parcel = await prisma.parcel.findUnique({ where: { id } });
    if (!parcel) {
        throw new Error('Parcel not found');
    }
    return parcel;
  } catch (error) {
    throw new Error (error.message);
  }
};

// Update parcel
const updateParcel = async (id, updateData) => {
  try {
    const { item_name, category, quantity, weight, width, length, height, description } = updateData;
    const updatedParcel = await prisma.parcel.update({
        where: { id },
        data: {
            item_name: item_name || undefined,
            category: category || undefined,
            quantity: quantity || undefined,
            weight: weight || undefined,
            width: width || undefined,
            lenght: length|| undefined,
            height: height || undefined,
            description: description || undefined,
        },
    });
    return { message: 'Parcel updated succesfully', parcel: updatedParcel};
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete parcel
const deleteParcel = async (id) => {
  try {
    await prisma.parcel.delete({ where: { id }});
    return { message: 'Parcel deleted succesfully'};
  } 
  catch (error) {
    
    throw new Error ('Failed to delete parcel');
  }
};

module.exports = {
    createParcel,
    getAllParcels,
    getParcelById,
    updateParcel,
    deleteParcel,
};