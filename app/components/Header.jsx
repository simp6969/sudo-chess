export function Header() {
  return (
    <div className="w-[100%] p-[15px] absolute flex-row justify-between flex gap-[10px] items-center top-0">
      <div className="flex flex-col justify-center items-center">
        <img
          height={50}
          width={50}
          className="rounded-[10px]"
          src="./icon.jpg"
        />
        <p>sudo</p>
      </div>
      <button className="btn btn-primary ">Sign in</button>
    </div>
  );
}
