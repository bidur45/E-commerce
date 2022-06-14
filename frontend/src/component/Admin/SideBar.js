import "./sidebar.css"
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import DashboardIcon  from "@mui/icons-material/Dashboard"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import PostAddIcon from "@mui/icons-material/PostAdd"
import AddIcon  from "@mui/icons-material/Add"
import ImportExportIcon from "@mui/icons-material/ImportExport"
import ListAltIcon from "@mui/icons-material/ListAlt"
import PeopleIcon from "@mui/icons-material/People"

const Sidebar = () => {
    return (
        <Fragment>
            <div className="sidebar">

                <Link to="/admin/dashboard">
                    <p>
                        <DashboardIcon /> Dashboard
                    </p>
                </Link>
                <Link>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ImportExportIcon />}
                    >
                        <TreeItem nodeId="1" label="Products">
                            <Link to="/admin/products">
                                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                            </Link>

                            <Link to="/admin/product">
                                <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                            </Link>
                        </TreeItem>
                    </TreeView>
                </Link>
                <Link to="/admin/orders">
                    <p>
                        <ListAltIcon />
                        Orders
                    </p>
                </Link>
                <Link to="/admin/users">
                    <p>
                        <PeopleIcon /> Users
                    </p>
                </Link>
             
            </div>
        </Fragment>
    )
}


export default Sidebar