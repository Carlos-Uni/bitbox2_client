

export default function CreateUserForm(){

    return(
        <div>
            <form>
                <label>Name:</label>
                <input type="text" />
                <label>Price:</label>
                <input type="text" />
                <label>Item Code:</label>
                <input type="text" />
                <label>Description:</label>
                <textarea></textarea>
                <input type="submit" value="Add" />
            </form>
        </div>
    );
}