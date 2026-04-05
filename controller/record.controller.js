// create Records

import Record from "../models/record.model.js";

export const createRecord = async (req,res)=>{
    try {
        const{amount,type,category,date,note}= req.body;

        const records = await Record.create({
            amount,
            type,
            category,
            date,
            note,
            createdBy:req.user._id
        })

        res.status(201).json({
            message:"Record Created",
            records
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}




// export const getRecords = async (req, res) => {
//   try {
//     const records = await Record.find();

//     res.status(200).json({
//       records
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };
export const getRecords = async (req, res) => {
  try {
    const { type, category } = req.query;

    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    const records = await Record.find(filter);

    res.json({ records });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const dashboardData = async (req, res) => {
  try {
    const income = await Record.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const expense = await Record.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const categoryData = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    const recent = await Record.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const monthly = await Record.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json({
      totalIncome: income[0]?.total || 0,
      totalExpense: expense[0]?.total || 0,
      netBalance:
        (income[0]?.total || 0) - (expense[0]?.total || 0),
      categoryData,
      recent,
      monthly
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, date, note } = req.body;

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({
        message: "Record not found"
      });
    }

    // update fields
    record.amount = amount || record.amount;
    record.type = type || record.type;
    record.category = category || record.category;
    record.date = date || record.date;
    record.note = note || record.note;

    const updatedRecord = await record.save();

    res.json({
      message: "Record updated successfully",
      updatedRecord
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};




export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({
        message: "Record not found"
      });
    }

    await record.deleteOne();

    res.json({
      message: "Record deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
