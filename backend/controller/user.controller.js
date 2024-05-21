const logger = require("../logger/logger");
const User = require("../model/user.model");
const {registerValidation, loginValidation} = require("./validation")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
logger = require("../logger/logger")


const secretKey = process.env.JWT_SECRET;

exports.updateEmail = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
      logger.error("Validation error: ", error);
      return res.status(400).json({ error: error.details[0].message });
  }
  const {userId, email} = req.body;

  const user = await User.findOne({_id: userId});

  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser._id.toString() !== userId) {
    logger.error("Email already registered: ", email);
    return res.status(409).json({ msg: "Email already registered" });
  }

  try {
    await User.updateOne(
      {_id: userId},
      {$set: {email: email}}
    )
    console.log(email);
    res.status(200).json({msg: "Email updated!"});
    logger.info("Email updated for user: ", userId)
  } catch (error) {
    logger.error("Interlan server error: ", error)
    res.status(500).json({error: "Internal server error"});
  }
}

exports.updateName = async (req, res) => {
  const { userId, name } = req.body;
  if (!userId) {
    logger.error("User ID was not retreived.");
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    await User.updateOne(
      { _id: userId }, 
      { $set: { name: name } }
    );

    res.status(200).json({ name });
    logger.info("Name updated: ", name);
  } catch (error) {
    logger.info("Internal server error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatePassword = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
      logger.error("Validation error: ", error)
      return res.status(400).json({ error: error.details[0].message });
  }
  const {userId, oldPass, newPass} = req.body;

  const user = await User.findOne({_id: userId});

  if (!userId) {
    logger.error("User ID not retreived.")
    return res.status(400).json({ error: "User ID is required" });
  }

  const passwordMatch = await bcrypt.compare(oldPass, user.password);
  if (!passwordMatch) {
    logger.error("Incorrect password for user with ID: ", userId);
    return res.status(401).json({error: "Incorrect password"});
  }

  const hashedPassword = await bcrypt.hash(newPass, 10);
  try {
    await User.updateOne(
      {_id: userId},
      {$set: {password: hashedPassword}}
    );
    res.status(200).json({msg: "Password updated"});
    logger.info("Password updated for user with ID: ", userId)
  } catch (error) {
    logger.error("Internal server error: ", error)
    res.status(500).json({error: "Internal server error"});
  }
}

exports.updateUsername = async(req, res) => {
  const { userId, username} = req.body;
  if (!userId) {
    logger.error("User ID not retreived.")
    return res.status(404).json({error: "User ID not found"})
  }

  const existingUser = await User.findOne({ username });

  if (existingUser && existingUser._id.toString() !== userId) {
    logger.error("Username already exists. Username: ", username)
    return res.status(409).json({ msg: "Username already registered" });
  }

  try {
    await User.updateOne(
      {_id: userId},
      {$set: {username: username}}
    );

    res.status(200).json({username});
    logger.info("Username updated: ", username);
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
    logger.error("Internal server error: ", error);
  }
}


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      logger.error("Username not found: ", username);
      return res.status(404).json({ error: 'Username not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.error("Incorrect password for username: ", username);
      return res.status(401).json({ error: 'Incorrect password' });
    }

     const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

     
    name = user.name;
    totalIncome = user.totalIncome;
    totalExpenses = user.totalExpenses;
    wallet = user.wallet;

   
  
    res.status(200).json({ token, name, username, totalIncome, totalExpenses, wallet});
    logger.info("Login!:", username)


  } catch (error) {
    logger.error("Login failed: ", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.create = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
      logger.error("Validation error: ", error);
      return res.status(409).json({ error: error.details[0].message });
  }

  try {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
          logger.error("Email already exists: ", email);
          return res.status(403).json({ error: 'Email already exists' });
      }

      const usernameExists = await User.findOne({ username: req.body.username });
      if (usernameExists) {
          logger.error("Username already exists: ", username);
          return res.status(403).json({ error: 'Username already taken' });
      }
      
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email
      });

      if(newUser.name === "") {
        logger.error("Name is required.")
        return res.status(409).json({error: "Name is required"})
      }

      const savedUser = await newUser.save();
      res.status(200).json({ data: savedUser });
      logger.info("User registered: ", username)
  } catch (err) {
      logger.error("Internal server error: ", error)
      res.status(500).json({ error: 'Internal server error' });
  }
};



exports.delete = async(req, res) => {
    const userId = req.params.userId;

    try {
        const user= await User.findOne({_id: userId});
        if(!user){
          logger.error("User not found: ", userId)
          return res.status(404).send("User not found")
        } 

        const result = await User.findOneAndDelete({_id: userId})
        res.status(200).json({data:result});
        logger.info("User deleted with ID: ", userId)
    } catch(err) {
        logger.error("Error: ", err);
        res.status(404).json({data: err});
    }
}

exports.addExpense = async(req, res) => {
  const {expensesAmount, expensesSource, userId} = req.body;
  try {
    const newExpensesTransaction = {
      amount: expensesAmount,
      source: expensesSource
    }

    const user = await User.findOne({_id: userId});
    if (!user) return res.status(404).json({message: "User not found"});

    user.totalExpenses += parseFloat(expensesAmount);
    user.expensesTransactions.push(newExpensesTransaction);
    wallet = user.wallet;
    

    await user.save();

    res.status(201).json({message: "Expenses added", totalExpenses: user.totalExpenses, wallet});
  } catch (error) {
    console.log("Error adding expenses");
    res.status(500).json({message: "Internet server error"});
  }
}

exports.getWallet = async(req, res) => {
  const {userId} = req.body;
  try {
    const user = await User.findOne({_id: userId});

    if(!user) return res.status(404).json({message: "User not found"});

    wallet = user.wallet;
    res.status(200).json({wallet});
  } catch (error) {
    console.log("Error fetching wallet", error);
    res.status(500).json({message: "Error fetching wallet"})
  }
}

exports.addIncome = async(req, res) => {
  const {incomeAmount, incomeSource, userId} = req.body;
  try {
    const newIncomeTransaction = {
      amount: incomeAmount,
      source: incomeSource,
      createdAt: new Date()
    }

    const user = await User.findOne({_id: userId});
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    user.totalIncome += parseFloat(incomeAmount);
    user.incomeTransactions.push(newIncomeTransaction);
    wallet = user.wallet;
   
    

    await user.save();
    
    res.status(201).json({ message: 'Income transaction added successfully', totalIncome: user.totalIncome, wallet});

  } catch (error) {
    console.error('Error adding income transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getExpenses = async(req, res) => {
  try {
    const {userId} = req.body;
    const user = await User.findOne({_id : userId});

    if (!user) return res.status(404).json({message:"User not found"});

    const expensesTransactions = user.expensesTransactions;

    res.status(200).json({expensesTransactions});
  } catch (error) {
    console.log("Error fetching expenses transactions");
    res.status(500).json({message:"Error fetching transactions"});
  }
}

exports.getIncome = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id : userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const incomeTransactions = user.incomeTransactions;
    
    res.status(200).json({ incomeTransactions });
  } catch (error) {
    console.error('Error fetching income:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


 
