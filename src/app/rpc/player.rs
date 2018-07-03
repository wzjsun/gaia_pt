#[constructor=true,hasmgr=false]
struct GetName{
    id: u32,
}

#[constructor=true,hasmgr=false]
struct SetName{
    id: u32,
    name: String,
}
