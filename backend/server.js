dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    return res.json({message:"Hello World"});
});

app.use("/api/auth",authRoutes);
app.use("/api/listings",listingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/api/profile", protect, (req, res) => {
    res.json({ user: req.user });
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.error("MongoDB error:",err));

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});