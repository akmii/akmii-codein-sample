import * as React from "react";

const MODULE_COMMON = "akmii-yeeoffice-common";
const MODULE_BIZCHARTS = "bizcharts";
const MODULE_MOMENT = "moment";

const FIELD_OPTION = "selectedOption";

interface DropdownSampleProps {
    context: CodeInContext;
    fieldsValues: any;
    readonly: boolean;
}

interface DropdownSampleStates {
    options?: string[];
}

class DropdownSample extends React.Component<DropdownSampleProps, DropdownSampleStates> {

    constructor(props, context) {
        super(props, context);
        this.state = {}
    }


    componentWillMount() {
        const { context } = this.props;
        const common = context.modules[MODULE_COMMON]
        const { Request } = common;
        var url = "https://frank.yeeflow.com/YeeOfficeSettings/_API/Ver(3.0)/api/crafts/datas/listid";
        var data = {
            AppID: 41,
            ListID: "1264751177358381057",
            columns: ["Title"],
            pageIndex: 1,
            pageSize: 100,
        };
        var req = new Request();
        req.post(url, data).then((rs) => {
            if (rs && rs.Status === 0 && rs.Data) {
                const options = rs.Data.map(d => {
                    return d.Title;
                })
                this.setState({ options });
            }
        });
    }

    onChange(v) {
        const { context } = this.props;
        context.setFieldValue(FIELD_OPTION, v);
    }

    render() {
        const { context } = this.props;
        const common = context.modules[MODULE_COMMON]
        const { AkSelect, AkSpin } = common;
        const { options } = this.state;
        const value = context.getFieldValue(FIELD_OPTION);
        if (options) {
            return <AkSelect value={value} onChange={v => this.onChange(v)}>
                {options.map((o, i) => {
                    return <AkSelect.Option key={i} value={o}>{o}</AkSelect.Option>
                })}
            </AkSelect>
        } else {
            return <AkSpin spinning></AkSpin>
        }
    }
}


export class CodeInApplication implements CodeInComp {
    render(context: CodeInContext, fieldsValues: any, readonly: boolean) {
        return <DropdownSample context={context} fieldsValues={fieldsValues} readonly={readonly} />;
    }

    requiredFields() {
        return [FIELD_OPTION];
    }

    requiredModules() {
        return [MODULE_BIZCHARTS, MODULE_MOMENT];
    }
}